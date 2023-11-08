var canvas = document.getElementById('drawingCanvas');
        var context = canvas.getContext('2d');
        var isDrawing = false;

        // Define a grossura da linha
        context.lineWidth = 14.5; // Altere para o valor desejado em pixels

        canvas.addEventListener('mousedown', function(e) {
            isDrawing = true;
            context.beginPath();
            context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        });

        canvas.addEventListener('mousemove', function(e) {
            if (!isDrawing) return;
            context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            context.stroke();
        });

        canvas.addEventListener('mouseup', function() {
            isDrawing = false;
        });

        document.getElementById("clearCanvas").addEventListener("click", function() {
            var canvas = document.getElementById("drawingCanvas");
            var context = canvas.getContext("2d");

            // Limpa o canvas preenchendo-o com uma cor de fundo (pode ser branco)
            context.fillStyle = "white";  // Altere a cor de fundo desejada
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Você pode adicionar outras ações de limpeza, se necessário
        });
        
        document.getElementById("sendDrawing").addEventListener("click", function() {

            // Obtenha a imagem em base64
            var imageDataURL = canvas.toDataURL("image/png");

            // Verifique se a imagem base64 contém dados
            if (imageDataURL.indexOf("base64,") === -1) {
                alert("Desenhe algo no canvas antes de enviar.");
                return;
            }

            // Remova o prefixo "data:image/png;base64,"
            var base64Data = imageDataURL.replace(/^data:image\/(png|jpeg);base64,/, "");

            // Adicione padding de acordo com o comprimento da string
            while (base64Data.length % 4 !== 0) {
                base64Data += "=";
            }

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "/process_drawing", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            var data = JSON.stringify({ "imageData": base64Data });
            xhr.send(data);

            xhr.onload = function() {
                if (xhr.status === 200) {

                    var response = JSON.parse(xhr.responseText);

                    var value_1 = response.value_1;
                    var value_2 = response.value_2;

                    document.getElementById("digitoValor").textContent = value_1;
                    document.getElementById("probabilidadeValor").textContent = value_2;

                } else {

                    document.getElementById("responseText").textContent = "Erro na solicitação.";
                }
            };
        });