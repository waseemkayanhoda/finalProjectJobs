from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_world():
    # C:\Users\WASSEM\Desktop\back\Jobz\src\main\resources\static
    df = pd.read_csv(
        "C:\\Users\\WASSEM\\Desktop\\back\\Jobz\\src\\main\\resources\\static\\Jobz.csv", encoding='latin1')
    df.head()

    # text = " ".join(i for i in df[' job_description '])
    text = " ".join(i for i in df.get('job_description'))
#stopwords = set(stopwords.words('english'))
# stopwords.remove('join')
    wordcloud = WordCloud(background_color="white").generate(text)
#plt.figure( figsize=(15,10))
#plt.imshow(wordcloud, interpolation='bilinear')
# plt.axis("off")
# plt.show()
# markdict = {"Software Engineer":1.0, "client":0.193, "Software Developer":0.19, "Security business":0.12, "Engineering team":0.16}
# marklist = sorted(wordcloud.words_(), key=lambda x:x[1])
# sortdict = dict(marklist)
# print(sortdict)
    words = wordcloud.words_
    words_sorted = sorted(
        words.items(), key=lambda x: x[1], reverse=True)[0:50]
    words_dict = dict(words_sorted)
    return words_dict


if __name__ == '__main__':
    app.run()
