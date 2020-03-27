import tweepy
from sys import argv
import time
import inquirer

def main():

    ### fetch all public tweets
    def fetch_public():
        public_tweets = api.home_timeline()
        for tweet in public_tweets:
            print(tweet.text)

    ### follow back all aka 'generous mode'
    def generous_mode():
        follower_threshold = input('Enter minimum followers count: ')
        for follower in limit_handler(tweepy.Cursor(api.followers).items()):
            # follow qua count
            if follower.followers_count >= follower_threshold:
                follower.follow()
    
    ### 
    def narcissist():
        search_string = input('Enter search term: ')
        numTweets = input('Enter num of Tweets to retweet: ')
        for tweet in limit_handler(tweepy.Cursor(api.search, search_string).items(numTweets)):
            try:
                tweet.favorite()
                print('favorited')
            except tweepy.TweepyError as e:
                print(e.reason)
            except StopIteration:
                break

    def google():
        print('you found it')
    
    ###
    def retweet():
        search_string = input('Enter search term: ')
        numTweets = input('Enter num of Tweets to retweet: ')
        for tweet in limit_handler(tweepy.Cursor(api.search, search_string).items(numTweets)):
            try:
                tweet.retweet()
                print('retweeted')
            # except tweepy.TweepyError as e:
            #     print(e.reason)
            except StopIteration:
                break


    ### RATE LIMIT HANDLER
    def limit_handler(cursor):
        try:
            while True:
                yield cursor.next()
        except tweepy.RateLimitError:
            time.sleep(1000)
    
    # callable keys
    methods_dict = {
    "retweet": retweet,
    "public": fetch_public,
    "favorite": narcissist,
    "follow": generous_mode,
    "test": google }

    def methodMain(name):
        methods_dict[name]()

    # init auth
    consumer_key = input('Enter consumer key: ')
    consumer_secret = input('Enter consumer secret: ')
    access_token = input('Enter access token: ')
    access_token_secret = input('Enter access token secret: ')

    try:
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        print(f'Authenticated as {user.screen_name}')
    except:
        print('Authentication failed...')

    user = api.me()

    # prompt user for method selection
    choices_arr = []
    for key in methods_dict.keys():
        choices_arr.append(key)
    method_choice = inquirer.list_input("Choose a method: ",choices=choices_arr)
    methodMain(method_choice)

if __name__ == '__main__':
    main()