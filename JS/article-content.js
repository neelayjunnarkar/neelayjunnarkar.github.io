function setArticleDispsBlock() {
    for (var i = 0; i < document.getElementsByClassName('article-content').length; ++i)
        (document.getElementsByClassName('article-content')[i]).style.display = 'block';
    for (var i = 0; i < document.getElementsByClassName('article-summary').length; ++i)
        document.getElementsByClassName('article-summary')[i].style.display = 'none';

    setEyes();
}

function setArticleDispsNone() {
    for (var i = 0; i < document.getElementsByClassName('article-content').length; ++i)
        (document.getElementsByClassName('article-content')[i]).style.display = 'none';
    for (var i = 0; i < document.getElementsByClassName('article-summary').length; ++i)
        document.getElementsByClassName('article-summary')[i].style.display = 'block';

    setEyesCrossed();
}

function centerImgs() {
    //center all imgs, including icons
    for (var i = 0; i < document.getElementsByTagName('img').length; ++i)
        document.getElementsByTagName('img')[i].style.verticalAlign = 'middle';
}

//last 11 characters
var eyecrossed = 'crossed.png'
var eye = 'mgs/eye.png'

function setEyes() {
    for (var i = 0; i < document.getElementsByClassName('article').length; ++i) {
        var article = document.getElementsByClassName('article')[i];
        if (article === document.getElementById('Programs Statement'))
            continue;
        var icon = article.children[0].children[0];
        var img = icon.children[0].children[0];
        img.src = '/Imgs/eye.png'
    }
}

//have to make it so that doesnt try and switch id Program Statements
function setEyesCrossed() {
    for (var i = 0; i < document.getElementsByClassName('article').length; ++i) {
        var article = document.getElementsByClassName('article')[i];
        if (article === document.getElementById('Programs Statement'))
            continue;
        
        var icon = article.children[0].children[0];
        var img = icon.children[0].children[0];
        img.src = '/Imgs/eye-crossed.png';
    }
}

function toggleEye(id) {
    var article = document.getElementById(id);
    var icon = article.children[0].children[0];
    var img = icon.children[0].children[0];
    if (img.src.substr(img.src.length - 11) === eyecrossed)
        img.src = '/Imgs/eye.png'
    else if (img.src.substr(img.src.length - 11) === eye)
        img.src = '/Imgs/eye-crossed.png'
}

function toggleContent(id) {

    var article = document.getElementById(id);
    for (var i = 0; i < article.children.length; ++i) {
        if (article.children[i].classList.contains('article-content')) {
            if (article.children[i].style.display === 'none')
                article.children[i].style.display = 'block';
            else if (article.children[i].style.display === 'block')
                article.children[i].style.display = 'none';
        } else if (article.children[i].classList.contains('article-summary')) {
            if (article.children[i].style.display === 'none') {
                article.children[i].style.display = 'block';
            } else if (article.children[i].style.display === 'block') {
                article.children[i].style.display = 'none';
            }
        }
    }

    toggleEye(id);
}