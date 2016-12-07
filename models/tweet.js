class Tweet {
  constructor (text, createdAt, userName, retweets, favorites, img_url){
    this.text = text,
    this.createdAt = createdAt,
    this.userName = userName,
    this.retweets = retweets,
    this.favorites = favorites,
    this.img_url = img_url
  }
}

module.exports = Tweet
