f'''
    prefix {
        foo(f"""
            inner prefix
            { bar["q"] + f'insane{42 + 9000}stuff{def aaa(): pass}111'}
            inner suffix
        """)
    } suffix
'''
