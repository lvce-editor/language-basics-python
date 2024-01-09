@dec
# Bar.name=... is not legal, but the test is for highlighter not breaking badly
class Spam(Foo.Bar, Bar.name={'very': 'odd'}):
    pass
