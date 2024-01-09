match 'prefix' + foo:
    ... # cases
match "prefix" + foo:
    ... # cases
match f'prefix{foo}':
    ... # cases
match f"prefix{foo}":
    ... # cases
match -foo:
    ... # cases
match not foo:
    ... # cases
