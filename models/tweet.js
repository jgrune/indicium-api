class Tweet {
  constructor (text, createdAt, userName, retweets, favorites){
    this.text = text,
    this.createdAt = createdAt,
    this.userName = userName,
    this.retweets = retweets,
    this.favorites = favorites
  }
}

module.exports = Tweet
