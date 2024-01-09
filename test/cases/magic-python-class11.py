class F:
    def __init__(self, a, b=1):
        self.a = a
        self.b = b
        print(self)
        self()
        a.self = 1
        a.self.bar = 2
        self[123]
