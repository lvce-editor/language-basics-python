# testing comments in function definition
def foo(    # before args
    a=42,   # between
            # args
    b=      # in args
      24,
    d       # before '='
     =99,
    e
    )       # incomplete definition, missing COLON, you're probably typing it
    # pre docstring
    '''Docstring'''
    # post docstring

def bar(): return 1
