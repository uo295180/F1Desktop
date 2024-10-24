import xml.etree.ElementTree as ET
import os

NAMESPACE = {'ns': 'http://uniovi.es'}
absolute_path = os.path.dirname(__file__)


def convertToSvg(archivo):
    arbol = ET.parse(archivo)
    raiz = arbol.getroot()

    svg = ET.Element('svg', xmlns="http://www.w3.org/2000/svg", version="2.0")
    alt = ""
    alt += f"0,0 "
    for tramo in raiz.findall('.//ns:tramo', NAMESPACE):
        distancia = tramo.find('.//ns:distancia', NAMESPACE).text
        altitud = tramo.find('.//ns:altitud', NAMESPACE).text

        alt += f"{distancia},{altitud} "
    alt += f"0,0 "

    polyline = ET.Element('polyline', points=alt, style="fill:white;stroke:red;stroke-width:4")
    svg.append(polyline)

    archivoSalida = os.path.join(absolute_path, 'altimetria.svg')
    arbol = ET.ElementTree(svg)
    arbol.write(archivoSalida, encoding='utf-8', xml_declaration=True)

    print("svg")

def main():    
    #miArchivoXML = input('Introduzca un archivo XML = ')
    miArchivoXML = "circuitoEsquema.xml"
    miArchivoXML = os.path.join(absolute_path,miArchivoXML)
    
    convertToSvg(miArchivoXML)

if __name__ == "__main__":
    main()   