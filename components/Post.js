function Post({ name, ingredients }) {
  return (
    <div className="post">
      <div className="text">
        <h2>{name}</h2>
        <ul>
          {ingredients.map(i => <li key={i}>{i}</li>)}
        </ul>
      </div>      
      <style jsx>{`
        .post {
          margin-right: 20px;
        }
      `}</style>
    </div>    
  )
}

export default Post
