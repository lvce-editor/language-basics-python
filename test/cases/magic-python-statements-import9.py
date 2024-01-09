from . . . foo import \
    (
        # XXX: legal comment inside import
        time as bar,
        # another comment
        baz,
        datetime as ham
    )
raise Exception('!') from None
