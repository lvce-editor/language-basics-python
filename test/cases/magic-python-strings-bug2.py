# issue 150
cmd = "git-clang-format --style=\"{{BasedOnStyle: Google, ColumnLimit: 100, IndentWidth: 2, " \
 "AlignConsecutiveAssignments: true}}\" {COMMIT_SHA} -- ./**/*.proto > {OUTPUT}".format(
