a = r"foo#not a comment"
a = r"""
    (?x)        # multi-line regexp
        foo     # comment
"""
a = R"""
    (?x)        # not a
        foo     # comment
"""
