function PostCard(data) {
  const col = document.createElement('div')
  col.classList.add('col-md-4', 'col-sm-12')
  const card = document.createElement('div')
  card.classList.add('card')
  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  const cardTitle = document.createElement('h5')
  cardTitle.classList.add('card-title')
  cardTitle.innerText = data.author
  const cardSubtitle = document.createElement('h6')
  cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-body-secondary')
  cardSubtitle.innerText = data.username
  const cardText = document.createElement('p')
  cardText.classList.add('card-text')
  cardText.innerText = data.description
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cardSubtitle)
  cardBody.appendChild(cardText)
  card.appendChild(cardBody)
  col.appendChild(card)
  return col
}

;(async () => {
  const postsList = document.getElementById('postsList')
  const result = await fetch('/posts')
  const response = await result.json()
  for (const post of Array.from(response.posts)) {
    postsList.appendChild(PostCard(post))
  }
})()
