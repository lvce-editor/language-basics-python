'''TEST'''

class Foo:
    # comment
    R'''TEST'''

    def foo(self, a:'''TEST''') -> '''TEST''': #ok
        r'''TEST'''
        with bar:
            pass

    def bar(self, a:'''TEST''') -> '''TEST''': pass
        '''TEST''' # additional docstring
        with bar:
            pass
