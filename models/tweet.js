class Tweet {
  constructor (text, createdAt, userName, retweets, favorites){
    this.text = text,
    this.createdAt = createdAt,
    this.userName = userName,
    this.retweets = retweets,
    this.favorites = favorites,
    this.img_url = `https://twitter.com/${this.userName}/profile_image?size=original`
  }
}

module.exports = Tweet
