while chunk := file.read(8192):
   process(chunk)
   y0 = (y1 := f(x))
