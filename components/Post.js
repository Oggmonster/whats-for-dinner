function Post({ name, ingredients }) {
  return (
    <div className="post">
      <div className="text">
        <h2>{name}</h2>
        <ul>
          {ingredients.map(i => <li key={i}>{i}</li>)}
        </ul>
      </div>
    </div>    
  )
}

export default Post
