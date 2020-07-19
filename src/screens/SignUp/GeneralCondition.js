import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {Button, Icon} from 'native-base';
import {CREATE_ACTION} from '../../Utils/Constants';
import {Text as ElementText} from 'react-native-elements';

export default function GeneralCondition({updateAction}) {
  return (
    <ScrollView
      centerContent
      style={{
        padding: 20,
        backgroundColor: '#fce3ba',
      }}>
      <View>
        <Button
          transparent
          onPress={() => updateAction(CREATE_ACTION)}
          style={{borderRadius: 30, width: 50}}>
          <Icon style={{color: '#000'}} name="md-arrow-back" type="Ionicons" />
        </Button>
      </View>
      <ElementText h4 h4Style={{fontSize: 20, marginBottom: 20}}>
        Les Conditions générales
      </ElementText>
      {/*todo update the text*/}
      <Text>
        En accédant au module de personnalisation et au site web de Schroders,
        certaines de vos données seront fournies et/ou collectées. Elles peuvent
        être fournies volontairement par le biais de formulaires à remplir ou
        collectées dans le but de formaliser un contrat, fournir un service ou
        pour un intérêt légitime dès lors que le traitement ne porte pas
        atteinte à vos droits fondamentaux.
      </Text>
      <Text>
        Vous consentez au traitement par Schroders,les sociétés du groupe
        Schroders, leurs agents et sous-traitants, des données personnelles que
        vous avez fournies ou qui seront collectées. Le traitement de ces
        données peut être réalisé aux fins suivantes : i) fournir les services
        proposés par le site ii) maintenir à jour les données relatives aux
        clients (ou aux prospects) de Schroders ; iii) disposer d’informations
        supplémentaires afin de développer, améliorer et gérer les produits et
        services qui peuvent vous être fournis ; iv) vous informer de tous
        autres produits ou services de Schroders par courrier, fax, e-mail et
        téléphone par le biais de sollicitation commerciale ; v) prévenir et
        détecter la fraude ou le blanchiment et/ou satisfaire à nos obligations
        légales ou réglementaires ; vi) protéger tout à la fois vos intérêts et
        ceux de Schroders, et vii) transférer des données personnelles hors de
        l’Espace Économique Européen à des fins conformes à celles exposées dans
        les présentes Conditions Générales et en conformité avec le cadre légal
        en vigueur.
      </Text>

      <Text>
        Les données seront conservées pendant la durée nécessaire à la
        fourniture des services auxquels vous avez souscrits ainsi que pour
        respecter les obligations légales et règlementaires.
      </Text>
      <Text style={{marginBottom: 40}}>
        Le site de Schroders utilise, en outre, sur certaines pages, des «
        cookies » afin de recueillir des informations relatives aux visiteurs de
        ces sites. Ces informations sont susceptibles d'être enregistrées, ou
        lues, dans votre terminal, sous réserve de vos choix. Le dépôt et la
        lecture de cookies nous permettent d’analyser vos centres d'intérêts
        pour vous proposer des publicités personnalisées et votre navigation et
        pour mesurer l'audience de notre site internet. Vous pouvez vous opposer
        à l’utilisation de cookies en configurant votre navigateur ce qui peut
        avoir pour effet de détériorer votre navigation sur notre site.
      </Text>
    </ScrollView>
  );
}
