(function() {
    document.addEventListener("DOMContentLoaded", function () {
        const themeList = document.getElementById("themeList");
        const editModal = document.getElementById("editModal");
        const newThemeButton = document.getElementById("newThemeButton");
        const closeEditModal = editModal.querySelector(".close");
		const themeNameInput = document.getElementById("themeName");
        const themeForm = document.getElementById("themeForm");
		const submitButton = themeForm.querySelector("#saveChangesButton"); 
		const modalTitle = editModal.querySelector("h2");
        let selectedTheme = null;
		nextThemeId = 3


		// Load Themes: Carrega o mock themes.json        
		 async function loadThemes() {
            try {
                const response = await fetch('themes.json');
                return await response.json();
            } catch (error) {
                console.error('Erro ao carregar os temas:', error);
                return [];
            }
        }

		// populateThemes: Preenche a lista de temas (forEach), e cria um item theme
		async function populateThemes() {
			const themes = await loadThemes();
			themeList.innerHTML = "";
			themes.forEach(theme => {
				const themeElement = createThemeElement(theme);
				themeList.appendChild(themeElement);
			});
		}
	
  		// createThemeElement: Cria no HTML a renderização do Tema :) 
        function createThemeElement(theme) {
            const themeElement = document.createElement("div");
            themeElement.classList.add("theme");
			const nameElement = document.createElement("h3");
			nameElement.textContent = theme.name; 
			if (!theme.id) {
				theme.id = nextThemeId++;
			}
			themeElement.dataset.id = theme.id;

			const colorPrimary = document.createElement("div");
			colorPrimary.classList.add("color-preview");
			colorPrimary.style.backgroundColor = theme.colors.primary;
			const primaryHexText = document.createElement("span");
			primaryHexText.textContent = theme.colors.primary; 
			colorPrimary.appendChild(primaryHexText); 


			const colorSecondary = document.createElement("div");
			colorSecondary.classList.add("colorsecondary-preview");
			colorSecondary.style.backgroundColor = theme.colors.secondary;
			const secondaryHexText = document.createElement("span");
			secondaryHexText.textContent = theme.colors.secondary; 
			colorSecondary.appendChild(secondaryHexText); 

			const buttonSuccessColor = document.createElement("button");
			buttonSuccessColor.classList.add("buttonsuccess-preview");
			buttonSuccessColor.style.backgroundColor = theme.colors.success;
			const buttonSuccessHexText = document.createElement("span");
			buttonSuccessHexText.textContent = theme.colors.success;
			buttonSuccessColor.appendChild(buttonSuccessHexText); 

			const buttonDanger = document.createElement("button");
			buttonDanger.classList.add("buttondanger-preview");
			buttonDanger.style.backgroundColor = theme.colors.danger;
			const buttonDangerHexText = document.createElement("span");
			buttonDangerHexText.textContent = theme.colors.danger;
			buttonDanger.appendChild(buttonDangerHexText); 
	

			const buttonWarning = document.createElement("button");
			buttonWarning.classList.add("buttonwarning-preview");
			buttonWarning.style.backgroundColor = theme.colors.warning;
			const buttonWarningHexText = document.createElement("span");
			buttonWarningHexText.textContent = theme.colors.warning;
			buttonWarning.appendChild(buttonWarningHexText); 
	

			themeElement.appendChild(nameElement);
			themeElement.appendChild(colorPrimary);
			themeElement.appendChild(colorSecondary);

			themeElement.appendChild(buttonSuccessColor);
			themeElement.appendChild(buttonDanger);
			themeElement.appendChild(buttonWarning);

			themeElement.addEventListener("click", () => openEditModal(theme));
            return themeElement;
        }

		// fillThemeForm: Função que vai preencher o formulário com os dados do tema selecionado
		function fillThemeForm(theme) {
			themeForm.elements["themeName"].value = theme.name;
			Object.keys(theme.colors).forEach(color => {
				themeForm.elements[color + "Color"].value = theme.colors[color];
			});
		}

		function resetThemeForm() {
			themeForm.reset();
		}
	
		// OpenOditModal: Abre a modal de edição do tema, recebendo como props theme, ele vai validar se o título é Editar ou Adicionar
        function openEditModal(theme) {
			selectedTheme = theme;
				  
			if (selectedTheme) {
				modalTitle.textContent = "Editar Tema";
				submitButton.textContent = "Salvar Alterações";
				fillThemeForm(selectedTheme);
			} else {
				modalTitle.textContent = "Adicionar Novo Tema";
				submitButton.textContent = "Adicionar";
				resetThemeForm();
			}
			editModal.style.display = "block";
		}
		
        // CloseEditModalHandler: Função para fechar a modal
        function closeEditModalHandler() {
            editModal.style.display = "none";
        }

        // Event listener para fechar a modal ao clicar no botão "X"
        closeEditModal.addEventListener("click", closeEditModalHandler);

        // Event listener para fechar a modal ao clicar fora dela
        window.onclick = function (event) {
            if (event.target == editModal) {
                closeEditModalHandler();
            }
        };
	
		// Função para atualizar ou adicionar um tema
		function updateOrAddTheme(theme) {
			if (selectedTheme) {
				selectedTheme.name = theme.name;
				selectedTheme.colors = theme.colors;

				const themeElement = document.querySelector(`[data-id="${selectedTheme.id}"]`);
				if (themeElement) {
					themeElement.querySelector(".color-preview").style.backgroundColor = selectedTheme.colors.primary;
					themeElement.querySelector(".color-preview span").textContent = selectedTheme.colors.primary;

					themeElement.querySelector("h3").textContent = selectedTheme.name;
					themeElement.querySelector(".colorsecondary-preview").style.backgroundColor = selectedTheme.colors.secondary;
					themeElement.querySelector(".colorsecondary-preview span").textContent = selectedTheme.colors.secondary;

					themeElement.querySelector(".buttonsuccess-preview").style.backgroundColor = selectedTheme.colors.success;
					themeElement.querySelector(".buttonsuccess-preview span").textContent = selectedTheme.colors.success;

					themeElement.querySelector(".buttondanger-preview").style.backgroundColor = selectedTheme.colors.danger;
					themeElement.querySelector(".buttondanger-preview span").textContent = selectedTheme.colors.danger;

					themeElement.querySelector(".buttonwarning-preview").style.backgroundColor = selectedTheme.colors.warning;
					themeElement.querySelector(".buttonwarning-preview span").textContent = selectedTheme.colors.warning;

					updateThemeElement(themeElement, selectedTheme);
				}
				} else {
					const themeElement = createThemeElement(theme);
					themeList.appendChild(themeElement);
				}
				selectedTheme = null;
				editModal.style.display = "none";

				if (selectedTheme) {
					const colorPreviewElement = editModal.querySelector(".color-preview");
					colorPreviewElement.style.backgroundColor = theme.colors.primary;
					primaryHexText.textContent = theme.colors.primary;
			
					const colorSecondaryPreviewElement = editModal.querySelector(".colorsecondary-preview");
					colorSecondaryPreviewElement.style.backgroundColor = theme.colors.secondary;
				
					const buttonSuccessPreviewElement = editModal.querySelector(".buttonsuccess-preview");
					buttonSuccessPreviewElement.style.backgroundColor = theme.colors.success;
				
					const buttonDangerPreviewElement = editModal.querySelector(".buttondanger-preview");
					buttonDangerPreviewElement.style.backgroundColor = theme.colors.danger;
				
					const buttonWarningPreviewElement = editModal.querySelector(".buttonwarning-preview");
					buttonWarningPreviewElement.style.backgroundColor = theme.colors.warning;
				}
		}
       
		 // Event listener para o botão de submissão dentro do modal (Editar)
		submitButton.addEventListener("click", function(event) {
			event.preventDefault();
			const formData = new FormData(themeForm);
			const updatedTheme = {
				name: formData.get("themeName"),
				colors: {
					primary: formData.get("primaryColor"),
					secondary: formData.get("secondaryColor"),
					success: formData.get("successColor"),
					danger: formData.get("dangerColor"),
					warning: formData.get("warningColor")
				}
			};
			editModal.style.display = "none";
			updateOrAddTheme(updatedTheme);
		});

		// Função para adicionar um novo tema
		themeForm.addEventListener("submit", function(event) {
			event.preventDefault(); 
			const formData = new FormData(themeForm);
			const newTheme = {
				name: formData.get("themeName"),
				colors: {
					primary: formData.get("primaryColor"),
					secondary: formData.get("secondaryColor"),
					success: formData.get("successColor"),
					danger: formData.get("dangerColor"),
					warning: formData.get("warningColor")
				}
			}
			updateOrAddTheme(newTheme);
		});
		
		newThemeButton.addEventListener("click", function() {
			openEditModal(null);
		});

		newThemeButton.removeEventListener("submit", openEditModalNullHandler);

		// Adiciona o evento de clique ao botão "Novo Tema"
		newThemeButton.addEventListener("submit", openEditModalNullHandler);

		// Função para lidar com o clique no botão "Novo Tema"
		function openEditModalNullHandler() {
			openEditModal(null);
		}

        // Popula a lista de temas ao carregar a página
        populateThemes();
    });
})();

	
  

