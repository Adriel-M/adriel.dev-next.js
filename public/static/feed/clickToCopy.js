function clickToCopy(buttonId, copyFromId) {
  document.getElementById(buttonId).addEventListener('click', function () {
    const textToCopy = document.getElementById(copyFromId).innerText
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        // empty
      },
      function (err) {
        alert('Could not copy text, please copy it manually')
      }
    )
  })
}
