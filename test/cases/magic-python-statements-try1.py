try:
    1/0
except AbcError as ex:
    pass
except (ZeroDivisionError, GhiError) as ex:
    print(ex)
else:
    1
finally:
    2
