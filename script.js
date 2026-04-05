// Variáveis globais
        let lastMin, lastMax;
        let history = [];
        
        const button = document.getElementById('generate');
        const resultSpan = document.querySelector('#result > span');
        const historyList = document.getElementById('historyList');
        
        // Função para atualizar o histórico
        function updateHistory(number, min, max) {
            // Armazena o número junto com o range usado
            history.unshift({ number: number, min: min, max: max });
            if (history.length > 5) history.pop();
            
            if (historyList) {
                historyList.innerHTML = history.map((item, index) => 
                    `<span class="history-item" data-min="${item.min}" data-max="${item.max}" data-number="${item.number}">
                        ${item.number}
                    </span>`
                ).join('');
                
                // Adicionar evento de clique para cada item do histórico
                document.querySelectorAll('.history-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const min = parseInt(this.dataset.min);
                        const max = parseInt(this.dataset.max);
                        const number = parseInt(this.dataset.number);
                        
                        // Preencher os inputs com o range original
                        document.getElementById('min').value = min;
                        document.getElementById('max').value = max;
                        
                        // Mostrar o número sorteado anteriormente
                        resultSpan.textContent = number;
                        resultSpan.style.color = '#efefef';
                        animateResult();
                        
                        // Salvar o range atual
                        lastMin = min;
                        lastMax = max;
                    });
                });
            }
        }
        
        // Função para mostrar erro com estilo
        function showError(message) {
            resultSpan.textContent = message;
            resultSpan.style.color = '#ff6b6b';
            
            setTimeout(() => {
                resultSpan.style.color = '#efefef';
            }, 2000);
        }
        
        // Função de animação
        function animateResult() {
            resultSpan.style.transform = 'scale(1.1)';
            setTimeout(() => {
                resultSpan.style.transform = 'scale(1)';
            }, 300);
        }
        
        // Função principal de sorteio
        function generateNumber(minVal, maxVal) {
            return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        }
        
        // Evento principal do botão gerar
        button.addEventListener('click', function() {
            let min = parseInt(document.getElementById('min').value);
            let max = parseInt(document.getElementById('max').value);
            
            // Validação mais completa
            if (isNaN(min) || isNaN(max)) {
                showError('⚠️ Preencha ambos os campos');
                return;
            }
            
            // Garantir que min e max sejam números inteiros
            min = Math.floor(min);
            max = Math.floor(max);
            
            // Validar se min é menor que max
            if (min >= max) {
                showError('⚠️ Mínimo deve ser menor que Máximo');
                return;
            }
            
            // Limitar range muito grande
            if (max - min > 1000000) {
                showError('⚠️ Intervalo muito grande (máx: 1 milhão)');
                return;
            }
            
            // Validar números negativos
            if (min < -1000000 || max > 1000000) {
                showError('⚠️ Use números entre -1.000.000 e 1.000.000');
                return;
            }
            
            // Salvar os valores
            lastMin = min;
            lastMax = max;
            
            // Gerar o número
            let result = generateNumber(min, max);
            
            // Atualizar o resultado com animação
            resultSpan.textContent = result;
            resultSpan.style.color = '#efefef';
            animateResult();
            
            // Atualizar histórico
            updateHistory(result, min, max);
        });
        
        // Adicionar tecla Enter para sortear
        const inputs = document.querySelectorAll('.input-field input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    button.click();
                }
            });
        });
        
        // Inicializar com um número padrão
        setTimeout(() => {
            if (document.getElementById('min').value && document.getElementById('max').value) {
                button.click();
            }
        }, 100);