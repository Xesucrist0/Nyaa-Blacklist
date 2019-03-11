import os
import sys

extensionList = ['mp3', 'flac', 'm4a']

class Folder:

    def __init__(self, name, extDict):
        self.name = name
        self.extDict = extDict

    def add_value(self, extension):
        self.extDict[extension] += 1
        return

def run(root, extensions):
    containers = []

    for root, folders, files in os.walk(root):

        for folder in folders:
            containers.append(Folder(os.path.join(root, folder), dict((ext, 0) for ext in extensions)))

        for file in files:
            file = os.path.join(root, file)
            fileExt = file.rsplit('.', 1)[1]
            if fileExt in extensions:
                for container in containers:
                    if container.name in file:
                        container.add_value(fileExt)
                        break

    for container in containers:
        for x in container.extDict:
            if container.extDict[x] != 0:
                print('{1}: {0}'.format(container.name, container.extDict))
                break

    return

if __name__ == '__main__':
    run(sys.argv[1], extensionList)
    input('Press Enter to close.')
