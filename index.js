document.addEventListener('DOMContentLoaded', ()=> {
    const imgUrl = 'https://api.artic.edu/api/v1/artworks/search?q=cats';
    const dropdown = document.getElementById('letter-dropdown');
    const imageContainer = document.getElementById('art-image-gallery');

    let artworks = [];

    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        artworks = data.data;
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
                let LikeCount = 0;
                likeButton.addEventListener('click', () => {
                    LikeCount++;
                    likeButton.textContent = `Like (${LikeCount})`;
                });

                const commentBox = document.createElement('textarea');
                commentBox.placeholder = 'Say Something...';

                const commentButton = document.createElement('button');
                commentButton.textContent = 'Submit Comment';

                const commentList = document.createElement('div');

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
