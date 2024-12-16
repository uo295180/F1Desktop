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

    etree.SubElement(document, 'name').text = "Planimetría"

    style = etree.SubElement(document, 'Style', id="redLineStyle")
    lineStyle = etree.SubElement(style, 'LineStyle')
    etree.SubElement(lineStyle, 'color').text = "ff0000ff"
    etree.SubElement(lineStyle, 'width').text = "5"

    placemark = etree.SubElement(document, 'Placemark')
    etree.SubElement(placemark, 'name').text = 'Circuito'

    etree.SubElement(placemark, 'styleUrl').text = "#redLineStyle"

    lookAt = etree.SubElement(placemark, 'LookAt')
    longitud = raiz.find('.//ns:salida/ns:coordenadas/ns:longitud/ns:gradosLongitud', NAMESPACE).text
    latitud = raiz.find('.//ns:salida/ns:coordenadas/ns:latitud/ns:gradosLatitud', NAMESPACE).text
    altitud = raiz.find('.//ns:salida/ns:coordenadas/ns:altitud', NAMESPACE).text
    etree.SubElement(lookAt, 'longitude').text = longitud
    etree.SubElement(lookAt, 'latitude').text = latitud
    etree.SubElement(lookAt, 'altitude').text = altitud
    etree.SubElement(lookAt, 'altitudeMode').text = 'absolute'

    line = etree.SubElement(placemark, 'LineString')
    
    
    textCoord = ""
    for tramo in raiz.findall('.//ns:tramo', NAMESPACE):
        longitud = tramo.find('.//ns:longitud/ns:gradosLongitud', NAMESPACE).text
        latitud = tramo.find('.//ns:latitud/ns:gradosLatitud', NAMESPACE).text
        altitud = tramo.find('.//ns:altitud', NAMESPACE).text

        textCoord += f"{longitud},{latitud},{altitud} "

    etree.SubElement(line, 'coordinates').text = textCoord

    archivoSalida = os.path.join(absolute_path, 'circuito.kml')
    arbol = etree.ElementTree(kml)
    arbol.write(archivoSalida, encoding='utf-8', xml_declaration=True)

    print("kml")



def main():    

    #miArchivoXML = input('Introduzca un archivo XML = ')
    miArchivoXML = "circuitoEsquema.xml"
    miArchivoXML = os.path.join(absolute_path,miArchivoXML)
    
    convertToKml(miArchivoXML)

if __name__ == "__main__":
    main()   


#    for tramo in raiz.findall('.//ns:tramo', NAMESPACE):
#        longitud = tramo.find('.//ns:longitud/ns:gradosLongitud', NAMESPACE).text
#        latitud = tramo.find('.//ns:latitud/ns:gradosLatitud', NAMESPACE).text
#        altitud = tramo.find('.//ns:altitud', NAMESPACE).text
#
#        placemark = etree.SubElement(document, 'Placemark')
#        distancia = tramo.find('.//ns:distancia', NAMESPACE).text
#        etree.SubElement(placemark, 'name').text = f"Tramo - {distancia} metros"
#
#        punto = etree.SubElement(placemark, 'Point')
#        coordenadas = f"{longitud},{latitud},{altitud}"
#        etree.SubElement(punto, 'coordinates').text = coordenadas