def foo(status):
    match status:
        case 404:
            return "Not found"
        case 401 | 403:
            return "Not allowed"
        case _:
            return "Something's wrong with the internet"
