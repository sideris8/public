	
    /* menu fixed on top */
    function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.getElementById("navbar").classList.add("sticky");
		} else {
			document.getElementById("navbar").classList.remove("sticky");
		}
	}

	window.onscroll = function() {scrollFunction()};


	/* menu mobile */
	function openNav() {
	document.getElementById("mySidenav").classList.add("open");
	}

	function closeNav() {
	document.getElementById("mySidenav").classList.remove("open");
	}

	//chiudo il menu al click su ogni li
	const menuRespLi = document.querySelectorAll(".menu_resp ul li");
	menuRespLi.forEach(function(clickLi) {
		clickLi.addEventListener('click', function() {
			closeNav();
		})
	  })
	



	/* tab ajax */  /* window.onload=function() { */
	function ajaxCall() {
		const container = document.getElementById("tab_container");
		//const tabContent = document.getElementById("risultato");

		//attivo la prima tab
		const tabItem = document.getElementById("tab_1");

		//creo variabile per tab attiva
		var tabAct = tabItem.id.split("_")[1];

		//assegno attributo current al container
		tabItem.parentNode.setAttribute("data-current",tabAct);

		//assegno classe active alla tab attiva
		tabItem.setAttribute("class","tab_active");

		//aggiungo evento click per ogni tab e assegno la funzione
		var tabs = container.getElementsByTagName("li");
		for (var i = 0; i < tabs.length; i++) {
		tabs[i].onclick=displayPage;

		}

		document.getElementById("tab_1").click(); //simulo il click

		//definisco la funzione
		function displayPage() {
			var current = this.parentNode.getAttribute("data-current");
			//rimuovo la classe active alla tab precendente
			document.getElementById("tab_" + current).removeAttribute("class");
		  
			var ident = this.id.split("_")[1];
			//aggiungo classe active alla nuova tab attiva
			this.setAttribute("class","tab_active");
			this.parentNode.setAttribute("data-current",ident);

			//creo costanti per loader
			const gifLoader = document.getElementById("loader");
			const loadCont = document.getElementById("content");

			//lancio loader
			gifLoader.style.display = "block";
			loadCont.style.display = "none";
			intervalLoader = setInterval(function () {
				gifLoader.style.display = "none";
				loadCont.style.display = "block";
				clearInterval(intervalLoader);
			}, 500);

			//chiamata ajax
			var xhttp = new XMLHttpRequest();
				xhttp.open("GET", "assets/ajax/tab" + ident + ".json", true);
				xhttp.send();
				xhttp.onreadystatechange = function() {
				  if (this.readyState == 4 && this.status == 200) {
					var testoInner = JSON.parse(xhttp.responseText);
					document.getElementById("content").innerHTML =
					testoInner.item.content + '';

				  } 
				};
		  }

	}


	/* validate form */
	function Modulo() {
		const message = document.modulo.message.value;
		const email = document.modulo.mail.value;
		const email_reg_exp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		
		if ((message == "") || (message == "undefined")) {
			alert("Il campo messaggio è obbligatorio.");
			document.modulo.message.focus();
			return false;
		} else if (!email_reg_exp.test(email) || (email == "") || (email == "undefined")) {
			alert("Inserire un indirizzo email corretto.");
			document.modulo.email.select();
			return false;
		} else {
			document.modulo.action = "elabora_dati.asp";
			document.modulo.submit();
		}
		
	}


	/* cookies */
	const cookieBar = document.getElementById("cookies");

	function showCookies() {
		loadCookie = setInterval(function () {
			cookieBar.classList.add("visible");
			clearInterval(loadCookie);
		}, 500);
	}

	function closeCookies() {
		cookieBar.classList.remove("visible");
	}

	

	window.onload = function() {showCookies(), ajaxCall()};