# testing annotations split over multiple lines
def some_func(a:
                 lambda x=None:
                    {key: val
                        for key, val in
                            (x if x is not None else [])
                    }=42):
