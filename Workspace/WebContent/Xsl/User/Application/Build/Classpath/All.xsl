<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- /Xsl/User/Application/Util/ -->
<xsl:import href="../../Util/UtilFormatPath.xsl"/>

<xsl:output method="text" encoding="ISO-8859-1" indent="no"/>
<!-- 
  <xsl:param name="pLogin"/>
  <xsl:param name="pPassword"/>
-->
  <xsl:param name="pApplication"/>
  <xsl:param name="pPath"/>

<!-- 
  <xsl:variable name="user" select="/ROOT/USER[LOGIN=$pLogin and PASSWORD=$pPassword]"/>
-->
  <xsl:variable name="user" select="/ROOT/USER"/>
  <xsl:variable name="application" select="$user/PROFILES/PROFILE/APPLICATIONS/APPLICATION"/>
  <xsl:variable name="classpath" select="$application[@Name=$pApplication]/BUILD/CLASSPATH"/>

<!-- 
  <xsl:variable name="path_main" select="/ROOT/USER[LOGIN=$pLogin and PASSWORD=$pPassword]/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name=current()]/PATHS/PATH[@Name='Main']"/>
-->
  <xsl:variable name="path_main" select="/ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name=current()]/PATHS/PATH[@Name='Main']"/>
    
  <xsl:template match="/">
    <xsl:variable name="lPathMain">
      <xsl:call-template name="replace-application-path">
         <xsl:with-param name="text" select="$application[@Name=$pApplication]/PATHS/PATH[@Name='Main']"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="lPathClass">
      <xsl:call-template name="replace-application-path">
         <xsl:with-param name="text" select="$application[@Name=$pApplication]/PATHS/PATH[@Name='Class']"/>
      </xsl:call-template>
    </xsl:variable>
    <!-- Variable de resultat -->
    <xsl:variable name="res">
      <!-- Ajout le chemin des classes de l'application courante -->
      <xsl:value-of select="concat($lPathMain,$lPathClass,';')"/>
      <xsl:for-each select="$classpath">
        <xsl:choose>
              <!-- Ajout le chemin des classes d'une application -->
          <xsl:when test="@Type='Application'">
		    <xsl:variable name="cpPathMain">
		      <xsl:call-template name="replace-application-path">
		         <xsl:with-param name="text" select="$application[@Name=current()]/PATHS/PATH[@Name='Main']"/>
		      </xsl:call-template>
		    </xsl:variable>
		    <xsl:variable name="cpPathClass">
		      <xsl:call-template name="replace-application-path">
		         <xsl:with-param name="text" select="$application[@Name=current()]/PATHS/PATH[@Name='Class']"/>
		      </xsl:call-template>
		    </xsl:variable>
            <xsl:value-of select="concat($cpPathMain,$cpPathClass,';')"/>
          </xsl:when>
          <!-- Chemin qui peut contenir des references � des applications -->
          <xsl:when test="@Type='Path'">
              <xsl:call-template name="replace-application-path">
                 <xsl:with-param name="text" select="concat(current(),';')"/>
              </xsl:call-template>
          </xsl:when>
          <!-- Ajout un fichier externe -->
          <xsl:when test="@Type='External'">
            <xsl:value-of select="concat(current(), ';')"/>
          </xsl:when>
        </xsl:choose>
      </xsl:for-each>
      <!-- Ajout les classes de l'environement -->
      <!-- <xsl:copy-of select="concat(xalan:checkEnvironment(), ';')"/> -->
    </xsl:variable>
    <!-- Ecrit le contenu de la variable resultat  -->
    <xsl:value-of select="normalize-space($res)"/>
  </xsl:template>

</xsl:stylesheet>