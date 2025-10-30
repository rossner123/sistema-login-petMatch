document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('arquivo', document.getElementById("arquivo").files[0])

    const response = await fetch('http://localhost:3000/users/1/profile-image', {
        method: 'POST',
        body: formData
    })

    if(response.ok) {
        alert("Upload feito com sucesso")
    }
    else{
        console.log(`Falhou lixo: ${response}`)
    }
})