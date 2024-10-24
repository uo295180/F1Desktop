import xml.etree.ElementTree as etree
import os

NAMESPACE = {'ns': 'http://www.uniovi.es'}
# obtencion de la ruta absoluta
absolute_path = os.path.dirname(__file__)

# problemas al buscar a lo largo del arbol
# necesario añadir el namespace para poder encontrar los elementos

def convertToKml(archivo):
    arbol = etree.parse(archivo)
    raiz = arbol.getroot()

    kml = etree.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
    document = etree.SubElement(kml, 'Document')

    salida = raiz.find('.//ns:salida', NAMESPACE)
    if salida is not None:
        longitud_salida = salida.find('.//ns:longitud/ns:gradosLongitud', NAMESPACE).text
        latitud_salida = salida.find('.//ns:latitud/ns:gradosLatitud', NAMESPACE).text
        altitud_salida = salida.find('.//ns:altitud', NAMESPACE).text

        placemark_salida = etree.SubElement(document, 'Placemark')
        etree.SubElement(placemark_salida, 'name').text = "Salida"

        point_salida = etree.SubElement(placemark_salida, 'Point')
        coordenadas_salida = f"{longitud_salida},{latitud_salida},{altitud_salida}"
        etree.SubElement(point_salida, 'coordinates').text = coordenadas_salida

    for tramo in raiz.findall('.//ns:tramo', NAMESPACE):
        longitud = tramo.find('.//ns:longitud/ns:gradosLongitud', NAMESPACE).text
        latitud = tramo.find('.//ns:latitud/ns:gradosLatitud', NAMESPACE).text
        altitud = tramo.find('.//ns:altitud', NAMESPACE).text

        placemark = etree.SubElement(document, 'Placemark')
        distancia = tramo.find('.//ns:distancia', NAMESPACE).text
        etree.SubElement(placemark, 'name').text = f"Tramo - {distancia} metros"

        punto = etree.SubElement(placemark, 'Point')
        coordenadas = f"{longitud},{latitud},{altitud}"
        etree.SubElement(punto, 'coordinates').text = coordenadas

    archivoSalida = os.path.join(absolute_path, 'circuito.kml')
    arbol = etree.ElementTree(kml)
    arbol.write(archivoSalida, encoding='utf-8', xml_declaration=True)

    print("kml")



def main():    

    miArchivoXML = input('Introduzca un archivo XML = ')
    miArchivoXML = os.path.join(absolute_path,miArchivoXML)
    
    convertToKml(miArchivoXML)

if __name__ == "__main__":
    main()   