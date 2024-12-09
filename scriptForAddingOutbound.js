// 我从sub store的tg里面拿过来改的，忘记作者是谁了，抱歉，我回头看看再加上作者名称。
let config = JSON.parse($files[0]) // 文件中的第一个
let proxies = await produceArtifact({
    type: 'collection', // 如果是组合订阅 就是 'collection'
    name: 'combined', // 订阅的"名称", 不是"显示名称"
    platform: 'sing-box',
    produceType: 'internal'
})

// 将全部节点结构插到 outbounds
config.outbounds.push(...proxies)

// 给每一个选择器加上 outbounds 节点的名称
config.outbounds.map(i => {
  if (['TCP代理'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
  if (['UDP代理'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
  if (['自动选择'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
  if (['OpenAI'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
  if (['YouTube'].includes(i.tag)) {
    i.outbounds.push(...proxies.map(p => p.tag))
  }
// 如果你更改了名称或者新增了选择器，请你自行modify
})


$content = JSON.stringify(config, null, 2)



