const quickIngredients = ['白朗姆', '君度', '青柠', '椰子酒', '金酒', '威士忌']

function AIChatBox({ value, onChange, onRecommend, onRandom, loading }) {
  const appendIngredient = (ingredient) => {
    const currentItems = value.split(/[，,、\s\n]+/).filter(Boolean)
    if (currentItems.includes(ingredient)) return
    onChange([...currentItems, ingredient].join('、'))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onRecommend()
  }

  return (
    <form className="ai-chat-box" onSubmit={handleSubmit}>
      <div className="ai-chat-box__label">
        <span>01</span>
        <div>
          <small>YOUR CABINET</small>
          <label htmlFor="ingredients">今晚，你的酒柜里有什么？</label>
        </div>
      </div>

      <div className="ai-chat-box__input-wrap">
        <textarea
          id="ingredients"
          value={value}
          disabled={loading}
          rows="4"
          placeholder={'输入已有材料，用逗号隔开…\n例如：君度、白朗姆、青柠、椰子酒'}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="ai-chat-box__quill" aria-hidden="true">✎</span>
      </div>

      <div className="ai-chat-box__quick" aria-label="快速添加材料">
        <span>快速添加</span>
        {quickIngredients.map((ingredient) => (
          <button key={ingredient} type="button" disabled={loading} onClick={() => appendIngredient(ingredient)}>
            + {ingredient}
          </button>
        ))}
      </div>

      <div className="ai-chat-box__actions">
        <button className="ai-chat-box__primary" type="submit" disabled={loading || !value.trim()}>
          <span aria-hidden="true">✦</span>
          使用我的材料
        </button>
        <button className="ai-chat-box__random" type="button" disabled={loading} onClick={onRandom}>
          <span aria-hidden="true">⚄</span>
          随机推荐
        </button>
      </div>
    </form>
  )
}

export default AIChatBox
