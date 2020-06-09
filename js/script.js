const foldersIcon = document.getElementsByClassName('folder-icons')

for(var i = 0;i < foldersIcon.length;i++)
{
    foldersIcon[i].addEventListener('click', alertListener)
}

function alertListener()
{
    alert('やばいわよ');
}