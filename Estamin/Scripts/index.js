document.addEventListener('DOMContentLoaded', function () {

// -------------------------------------------------------- FUNCTIONS -------------------------------------------

    // Apply a function to all nodes in a list of nodes
    function applyFnToNodes(nodes, func, ...args) {
        for (let node of nodes) {
            func(node, ...args);
        }
    }
    
    // Recursively get nth-parent of a node
    function parentAt(node, n) {
        if (n == 0) {
            return node;
        }else {
            return parentAt(node.parentNode, n - 1);
        }
    }

    // Rotate arrow icon
    function rotateArrow(node, degrees) {
        if (node) {
            if (node.style.transform == '' | node.style.transform == 'rotate(0deg)') {
              angle = 0;
            } else {
              angle = 1;
            }
        angle = (angle + 1) % 2;
        node.style.cssText = 'transform: rotate(' + angle * degrees + 'deg)';
        }
    }
    
    // Show content when a tab is clicked
    function showContent(e, node){
        e.preventDefault();
        var ref = e.target.getAttribute('href').substr(6);
        var clickedPane = document.getElementById('list-' + ref);
        if (previousPane) {
            previousPane.classList.remove('active', 'show');
        }
        clickedPane.classList.add('active', 'show');
        previousPane = clickedPane;
        if (node.parentNode.id != 'nav-tab') {
            contentToTopNav(node, ref);
        }
    }
    
    // Show content when another element (not tab) is clicked
    function activate(clickedNode, contentNode) {
        clickedNode.addEventListener('click', function (e) {
            e.preventDefault();
            var ref = contentNode.getAttribute('id').substr(5);
            if (previousPane) {
                previousPane.classList.remove('active', 'show');
            }
            contentNode.classList.add('active', 'show');
            previousPane = contentNode;
            contentToTopNav(clickedNode, ref);
        });
    }
    
    // Check if top navTab will add text or replace it (HAVE TO IMPROVE THE CODE - ¿switch maybe?)
    function checkNodeType(node) {
        if (node.parentNode.id == "sidebar-tab" ) {
            addTop = false;
        }else if (parentAt(node, 2).id == "sidebar-tab") {
            addTop = false;
        }else if (parentAt(node, 2).id == "list-home") {
            addTop = false;
        }else if (parentAt(node, 5).id == "list-home") {
            addTop =false
        }else if (parentAt(node, 5).id == "list-indInfo") {
            addTop = false;
        }else if (parentAt(node, 5).id == "list-ProdListConcesiones") {
            addTop = false;
        }else if (parentAt(node, 5).id == "list-seguConcesiones") {
            addTop = false;
        }else {
            addTop = true;
        }
        removeNavTop();
    }
    
    // Remove top navTab content
    function removeNavTop() {
        if (!addTop) {
            while (navTab.firstChild) {
                navTab.removeChild(navTab.firstChild);
            }
        }
    }
    
    // Remove the next elements (text) of the top nav text when it's clicked
    function removeNext(node) {
        while (node.nextElementSibling) {
            node.nextElementSibling.parentNode.removeChild(node.nextElementSibling);
        }
    }
    
    // Create the elements of the top nav
    function createNavItem(ref, text) {
        var a = document.createElement('a');
        a.classList.add('nav-item', 'nav-link');
        a.id = 'nav-' + ref + '-tab';
        a.setAttribute('href', '#list-' + ref);
        a.textContent = text;
        a.addEventListener('click', function(e){
            showContent(e, a);
            removeNext(this);
        });
        return a;
    }

    function addUpperLevels(node, ref) {
        if (node.classList.contains('nivel1')) {
            insertToTopNav(node.children[0], ref);
        } else if (node.classList.contains('nivel2')) {
            insertToTopNav(node.children[0], ref);
            addUpperLevels(node.previousElementSibling, ref);
        }
    }

    function addUpperListeners(node, n) {
        node.addEventListener('click', function() {
            showContent(e, this);

            removeNext(this);
        })
    }
    
    // Add text to top nav when content element is clicked (Gotta Improve Code)
    function contentToTopNav(clickedNode, ref) {
        checkNodeType(clickedNode);
        insertToTopNav(clickedNode, ref);
    }

    function insertToTopNav(clickedNode, ref) {
        if (navTab.children.length) {
            navTab.insertAdjacentHTML('beforeend', '<i class="fas fa-angle-right"></i>');
        }
        var text = (clickedNode.innerText || clickedNode.textContent);
        navTab.appendChild(createNavItem(ref, text));
    }
    
    // Show subelements of a table cell that has a left arrow (<)
    function showDepth3(node){
        var nextNode = node.nextElementSibling;
        if (nextNode) {
            nextNode.classList.toggle('show');
            showDepth3(nextNode);
        }
    }
// --------------------------------------------------------------------------------------------------------------
    //Angle for arrows
    var angle = 0;

    //Boolean for adding text to top nav
    var addTop = false;
    var previousPane;
    var contentContainer = document.getElementById('nav-tabContent');
    var modalContainer = document.getElementById('infoModal');
    var modalID = 1;
    var aceptarbtn = document.getElementById('aceptarbtn');
    var cancelarbtn = document.getElementById('cancelarbtn');
    var cerrarbtn = document.getElementById('cerrarbtn');
    var navTab = document.getElementById('nav-tab');
// --------------------------------------------------------------------------------------------------------------

    // Rotate arrow (>) 45 degrees next (left) to first level side bar elements.
    [].forEach.call(document.querySelectorAll('#sidebar-tab > a'), function(node){
        node.addEventListener('click', function(e){
            e.preventDefault();
            rotateArrow(node.querySelector('i'), 90);
        });
    });
// --------------------------------------------------------------------------------------------------------------
    // Show second level sidebar elements.
    [].forEach.call(document.querySelectorAll('.sidebar a'), function(node){
        node.addEventListener('click', function(e){
            e.preventDefault();
            if (node.nextElementSibling.tagName == 'DIV') {
                // Show
                if (node.nextElementSibling.style.display == '' | node.nextElementSibling.style.display == 'none') {
                  node.nextElementSibling.style.display = 'flex';
                }else{
                  // Hide
                  node.nextElementSibling.style.display = 'none';
                }
            }
        });
    });
// --------------------------------------------------------------------------------------------------------------

    // Show content corresponding to sidebar and nav tabs
    [].forEach.call(document.querySelectorAll('.list-group-item, .nav-item'), function(node){
        node.addEventListener('click', function(e){
            showContent(e, node);
        });
    });
// --------------------------------------------------------------------------------------------------------------

    //Show Infos
    applyFnToNodes(document.querySelectorAll('.tableCarbonifera > tr:nth-child(2) > td:first-child'), activate, document.getElementById('list-CarbObtInfo'));
    applyFnToNodes(document.querySelectorAll('.tableCarbonifera > tr:nth-child(3) > td:first-child'), activate, document.getElementById('list-CarbDestInfo'));



    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(3) > td:first-child'), activate, document.getElementById('list-MetaExtrObtInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(4) > td:first-child'), activate, document.getElementById('list-MetaExtrDestInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(6) > td:first-child'), activate, document.getElementById('list-MetaConcObtInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(7) > td:first-child'), activate, document.getElementById('list-MetaConcDestInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(9) > td:first-child'), activate, document.getElementById('list-MetaFundObtInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(10) > td:first-child'), activate, document.getElementById('list-MetaFundDestInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(12) > td:first-child'), activate, document.getElementById('list-MetaRefiObtInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(13) > td:first-child'), activate, document.getElementById('list-MetaRefiDestInfo'));
    applyFnToNodes(document.querySelectorAll('.tableMetalica > tr:nth-child(14) > td:first-child'), activate, document.getElementById('list-MetaRefiInvInfo'));
    applyFnToNodes(document.querySelectorAll('.tableNoMetalica > tr:nth-child(1) > td:first-child'), activate, document.getElementById('list-NoMetaObtInfo'));
    applyFnToNodes(document.querySelectorAll('#list-home tr:first-child > td:first-child'), activate, document.getElementById('list-indInfo'));
    applyFnToNodes(document.querySelectorAll('#list-ProdListConcesiones tr:first-child > td:nth-child(2)'), activate, document.getElementById('list-ProdDetalleConcesion'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:first-child > td:first-child'), activate, document.getElementById('list-SeguRegInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(2) > td:first-child'), activate, document.getElementById('list-SeguEstIncInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(3) > td:first-child'), activate, document.getElementById('list-SeguEstIncPelInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(4) > td:first-child'), activate, document.getElementById('list-SeguEstAccLevInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(5) > td:first-child'), activate, document.getElementById('list-SeguEstAccIncInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(6) > td:first-child'), activate, document.getElementById('list-SeguEstSegMenInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(7) > td:first-child'), activate, document.getElementById('list-SeguRepInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(8) > td:first-child'), activate, document.getElementById('list-SeguDiasPerdidosInfo'));
    applyFnToNodes(document.querySelectorAll('#list-SeguDetalleConcesion tr:nth-child(9) > td:first-child'), activate, document.getElementById('list-SeguAnalisisInfo'));

    var leftArrows = document.getElementsByClassName('fa-caret-left');
    for (let arrow of leftArrows) {
        arrow.addEventListener('click', function(e) {
            rotateArrow(arrow, -90);
            showDepth3(e.target.parentNode.parentNode);
        });
    }

    //Store Forms
    var modalbtn = document.querySelectorAll('#CarbObtInfo, #CarbDestInfo,#MetaExtrObtInfo, #MetaExtrDestInfo, #MetaConcObtInfo,\
        #MetaConcDestInfo, #MetaFundObtInfo, #MetaFundDestInfo, #MetaRefiObtInfo, #MetaRefiDestInfo, #NoMetaObtInfo, #SeguRegInfo, \
        #SeguEstIncInfo, #SeguEstIncPelInfo, #SeguEstAccLevInfo, #SeguEstAccIncInfo, #SeguRepInfo');
    for (let btn of modalbtn) {
        btn.addEventListener('click', function () {
            modalID = this.id;
            modalID = modalID.replace(/Info/g, 'Form');
            console.log(modalID);
            modalContainer.style.display = "block";
        });
    }

    modalContainer.addEventListener('click', function(e){
        if (e.target === this) {
            this.style.display = "none";
        }
    });

    aceptarbtn.addEventListener('click', function(){
        modalContainer.style.display = "none";
        if (previousPane) {
            previousPane.classList.remove('active', 'show');
        }
        var nombre = document.getElementById('list-' + modalID);
        nombre.classList.add('active', 'show');
        previousPane = nombre;
    });

    cancelarbtn.addEventListener('click', function(){
        modalContainer.style.display = "none";
    });

    cerrarbtn.addEventListener('click', function(){
        modalContainer.style.display = "none";
    });
});

// Informacion del Titular
[].forEach.call(document.getElementsByClassName('dropdown-toggle'), function(node){
    node.addEventListener('click', function(){
        node.parentNode.getElementsByClassName('dropdown-menu')[0].classList.toggle('show');
    });
});

[].forEach.call(document.getElementsByClassName('dropdown-item'), function(node){
    node.addEventListener('click', function(e){
        e.preventDefault();
        var text = (node.innerText || node.textContent);
        node.parentNode.parentNode.getElementsByClassName('dropdown-toggle')[0].innerHTML = text;
    });
});
