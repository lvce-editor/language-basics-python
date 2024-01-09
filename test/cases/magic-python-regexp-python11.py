a = r"""
    (?x)        # multi-XXXline XXX regexp
        foo     (?# comm TODOent TODO)
        foo     # type: int
        foo     (?# type: int)
"""
