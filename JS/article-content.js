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

//last 11 characters of eye and eye-crossed images
var eyecrossed = 'crossed.png'
var eye = 'mgs/eye.png'

function setEyes() {
    for (var i = 0; i < document.getElementsByClassName('article').length; ++i) { // Loop through all articles
        var article = document.getElementsByClassName('article')[i];
        if (article === document.getElementById('Programs Statement'))
            continue;
        var article_title = article.children[0];
        var img;
        for (var j = 0; j < article_title.children.length; ++j) { // Loop in case there are links or other html in the title
            if (article_title.children[j].classList.contains('subtitle-icon')) {
                img = article_title.children[j].children[0].children[0];
                if (!img.src.includes('github.png')) { // do not set the github icon to an eye
                    img.src = '/Imgs/eye.png';
                }
            }
        }
    }
}

//have to make it so that doesnt try and switch id Program Statements
function setEyesCrossed() {
    for (var i = 0; i < document.getElementsByClassName('article').length; ++i) { // Loop through all articles
        var article = document.getElementsByClassName('article')[i];
        if (article === document.getElementById('Programs Statement'))
            continue;
        var article_title = article.children[0];
        var img;
        for (var j = 0; j < article_title.children.length; ++j) { // Loop in case there are links or other html in the title
            if (article_title.children[j].classList.contains('subtitle-icon')) {
                img = article_title.children[j].children[0].children[0];
                if (!img.src.includes('github.png')) { // do not set the github icon to an eye
                    img.src = '/Imgs/eye-crossed.png';
                }
            }
        }
    }
}

// Switch crossed eye to eye, or eye to crossed eye
function toggleEye(id) {
    var article = document.getElementById(id);
    var article_title = article.children[0];
    var img;
    for (var i = 0; i < article_title.children.length; ++i) {
        if (article_title.children[i].classList.contains('subtitle-icon')) {
            img = article_title.children[i].children[0].children[0];
            if (img.src.substr(img.src.length - 11) === eyecrossed)
                img.src = '/Imgs/eye.png'
            else if (img.src.substr(img.src.length - 11) === eye)
                img.src = '/Imgs/eye-crossed.png'
        }
    }

}

// Switch from summary to content or content to summary
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