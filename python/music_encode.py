from subprocess import run
from shutil import move
from multiprocessing import Pool
from datetime import timedelta
import pathlib
import os
import sys
import time

opciones = {
    'qaac': 'C:/Users/xesu/Desktop/audio_encoding/qaac64.exe',
    'nuevaCarpeta': 'C:/Users/xesu/Desktop/',
    'hilos': 6,
}

errores = []

class Archivo():

    def __init__(self, rutaAbs):
        self.rutaAbs = rutaAbs
        self.container = rutaAbs.parent
        self.filename = rutaAbs.name

    def encode(self):
        run([str(pathlib.PurePath(opciones['qaac'])), "-s", "-V91", str(self.get_new() / self.filename)])
        return

    def move_to(self, new):
        os.makedirs(str(new), exist_ok=True)
        move(str(self.rutaAbs.with_suffix('.m4a')), new / self.rutaAbs.with_suffix('.m4a').name)
        return

    def get_new(self):
        new = pathlib.PurePath('')
        for x in self.container.parts:
            if not x in pathlib.Path.cwd().parts:
                new = new / x
        return new

def get_archivos():
    aconvertir=[]
    for raiz, _, archivos in os.walk(sys.argv[1]):
        for archivo in archivos:
            archivo = pathlib.PurePath(raiz) / pathlib.PurePath(archivo)
            if archivo.suffix in ['.wav', '.flac']:
                aconvertir.append(Archivo(archivo))
    return aconvertir

def iniciar(archivo):
    try:
        archivo.encode()
    except:
        errores.append('Error al encodear: {}'.format(archivo.rutaAbs))
    try:
        new = archivo.get_new()
    except:
        errores.append('Error al obtener la carpeta de destino: {}'.format(archivo.rutaAbs))
    try:
        archivo.move_to(pathlib.PurePath(opciones['nuevaCarpeta']) / new)
    except:
        errores.append('Error al mover: {}'.format(archivo.rutaAbs))
    return

if __name__ == "__main__":
    start=time.time()
    archivos = get_archivos()
    sys.stdout.write('Encodeando: 0%')
    with Pool(opciones['hilos']) as p:
        for i, _ in enumerate(p.imap_unordered(iniciar, archivos), 1):
            pass
            sys.stdout.write('\rEncodeando: {}%'.format(int(i*100/len(archivos))))
    sys.stdout.write('. Finalizado. Tiempo total: {} segundos.\n'.format(int(timedelta(seconds=time.time()-start).total_seconds())))
    if errores:
        sys.stdout.write('Se han encontrado los siguientes errores:\n')
        for error in errores:
            sys.stdout.write('{}\n'.format(error))
    input('Pulsa enter para cerrar.')
