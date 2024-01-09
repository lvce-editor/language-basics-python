class F:
    @classmethod
    def meth(cls, a, b=1):
        cls.a = a
        cls.b = b
        print(cls)
        cls()
        cls + 1
        a.cls = 1
        a.cls.__name__
        cls[123]
