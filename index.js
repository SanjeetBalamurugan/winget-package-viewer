const uploadList = document.getElementById("uploadList")
const output = document.getElementById("output")

var versionNum = ""
window.addEventListener("load", async (e) => {
  const latest = document.getElementById("latest")
  const ghubApi = await fetch("https://api.github.com/repos/microsoft/winget-cli/releases/latest")
    .then((res) => res.json());
  const version = await ghubApi.tag_name;

  latest.innerHTML = `Current Latest Version: ${version}`;
  versionNum = version;
})

const detailDiv = document.getElementById("detailDiv")
function sourceDetails(details) {
  detailDiv.innerHTML = `
  <p>Argument: <a href="${details.Argument}">${details.Argument}</a></p>
  <p>Identifier: ${details.Identifier}</p>
  <p>Name: ${details.Name}</p>
  <p>Type: ${details.Type}</p>
  `
}

function getVersion(json) {
  const ver = `v${json.WinGetVersion}`;
  detailDiv.innerHTML += `<p>WinGetVersion: ${ver}</p>`
  if (ver != versionNum) {
    alert(`You Have An Old Version Of WinGet The Latest Version Is ${versionNum}`)
  }
}

const pakgUI = document.getElementById("pakgUI")

pakgUI.style.opacity = 0;
pakgUI.style.pointerEvents = "none";

function packages(packageArray) {
  const packages = document.getElementById("packages")
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  for (let i = 0; i < packageArray.length; i++) {
    const package = packageArray[i];
    packages.innerHTML += `
          <h4>Package: </h4>
          <li>${package.PackageIdentifier}</li>
    `;
  }
  pakgUI.style.opacity = 1;
  pakgUI.style.pointerEvents = "all";
}

uploadList.addEventListener("change", async (e) => {
  var genUrl = URL.createObjectURL(uploadList.files[0]);
  console.log(genUrl)
  var data = await fetch(genUrl).then((res) => res.json())
  var source = data['Sources'][0]
  console.log(source['Packages'])
  console.log(source['SourceDetails'])
  console.log(sourceDetails(source['SourceDetails']))
  console.log(packages(source['Packages']))
  console.log(getVersion(data))
})