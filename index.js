document.addEventListener('DOMContentLoaded', ()=> {
    const imgUrl = 'http://localhost:3000/data';
    const dropdown = document.getElementById('letter-dropdown');
    const imageContainer = document.getElementById('art-image-gallery');
    imageContainer.style.textAlign = 'center';

    let artworks = [];

    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        artworks = data;
        displayArtworks(artworks);
    })
    .catch(error => console.error('Error fetching images:', error));

    function displayArtworks(artWorksToDisplay) {
        imageContainer.innerHTML = '';
        artWorksToDisplay.forEach(artwork => {
            if (artwork.thumbnail && artwork.thumbnail.lqip) {
                const imgElement = document.createElement('img');
                imgElement.src = artwork.thumbnail.lqip;
                imgElement.alt = artwork.thumbnail.alt_text;

                const likeButton = document.createElement('button');
                likeButton.textContent = 'Like';
                likeButton.style.backgroundColor = 'blue';
                likeButton.style.color = 'white';
                let LikeCount = 0;
                likeButton.addEventListener('click', () => {
                    LikeCount++;
                    likeButton.textContent = `Like (${LikeCount})`;
                });

                const commentBox = document.createElement('textarea');
                commentBox.placeholder = 'Say Something...';

                const commentButton = document.createElement('button');
                commentButton.textContent = 'Submit Comment';
                commentButton.style.backgroundColor = 'blue';
                commentButton.style.color = 'white';

                const commentList = document.createElement('div');
                commentList.style.textAlign = 'center';

                commentButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (commentBox.value.trim() !== '') {
                        const comment = document.createElement('p');
                        comment.textContent = commentBox.value;
                        commentList.appendChild(comment);
                        commentBox.value = '';
                    }
                });
                
                const artContainer = document.createElement('div');
                artContainer.appendChild(imgElement);
                artContainer.appendChild(likeButton);
                artContainer.appendChild(commentBox);
                artContainer.appendChild(commentButton);
                artContainer.appendChild(commentList);

                imageContainer.appendChild(artContainer);
            }
        });
    }
    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredArtworks = artworks.filter(artwork => {
            return artwork.title && artwork.title.toLowerCase().startsWith(selectedLetter);
        });
        displayArtworks(filteredArtworks);
    })    
});
