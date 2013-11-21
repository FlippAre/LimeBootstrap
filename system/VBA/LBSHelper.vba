Option Explicit

Private locAvalibleActionpads As Scripting.Dictionary


'=============================================
' Sets correct actionpad settings for all inspectors and the main AP
'
' Param "bPublishable" changes settings to a publishable version as
' the settings are not supported by the client GUI in the current versions
'=============================================
Public Sub setDefaultActionpads(Optional ByVal bPublishable As Boolean = False)
On Error GoTo ErrorHandler

    Dim oClass As LDE.Class
    Dim bShouldExist As Boolean
    Dim oFiles As Scripting.Dictionary
    
    'get avalible actionpad files
    Set oFiles = lbsHelper.getAvaliableActionpads
    
    'set inspector actionpads
    For Each oClass In ThisApplication.Database.Classes
        bShouldExist = oFiles.Exists(oClass.Name)
        Call lbsHelper.setDefaultActionpad(oClass.Name, bShouldExist, bPublishable)
    Next oClass
    
    'set main actionpad
    Call lbsHelper.setDefaultActionpad("index", True, bPublishable)

Exit Sub
ErrorHandler:
    Call UI.ShowError("lbsHelper.setActionpads")
End Sub

'=============================================
' Wrapper for "setActionpads" with "publishable" set to true
'=============================================
Public Sub setDefaultActionpadsPublishable()
On Error GoTo ErrorHandler

    Call lbsHelper.setDefaultActionpads(True)

Exit Sub
ErrorHandler:
    Call UI.ShowError("lbsHelper.setActionpadsPublishable")
End Sub

'=============================================
' Apply settings for a specific actionpad
' Removed actionpad if "bShouldExist" is false
' Sets without get params if "bPublishable" is true
'=============================================
Public Sub setDefaultActionpad(ByVal sClass As String, ByVal bShouldExist As Boolean, Optional ByVal bPublishable As Boolean = False)
On Error GoTo ErrorHandler

    Dim oSettings As LDE.Settings
    Dim sInspectorGUID As String
    Dim sUrlBase As String
    Dim sUrlSuffix As String
    Dim sUrl As String
    Dim lVisible As Long
    
    sUrlBase = ThisApplication.WebFolder + "lbs.html"
    sUrlSuffix = IIf(bPublishable, "", "?ap=" + sClass)
    sUrl = IIf(bShouldExist, sUrlBase + sUrlSuffix, "")
    lVisible = IIf(VBA.Len(sUrl) > 0, 1, 0)
    
    'index gets special treetment as it is not reloaded frequently and handle is avalible
    If sClass = "index" Then
        ThisApplication.WebBar.url = sUrl
    'normal inspector AP
    Else
        'find inspector GUID
        sInspectorGUID = Database.Classes(sClass).GUID
        'find inspector settings
        Set oSettings = ThisApplication.Database.Settings.Item("Inspectors")
        'check if inspector of the shoosen class exists
        If oSettings.Exists(sInspectorGUID) Then
            'write url and visible property
            Call oSettings.Item(sInspectorGUID + "\WebBar").Write("URL", sUrl)
            Call oSettings.Item(sInspectorGUID + "\WebBar").Write("Visible", lVisible)
        End If
    End If

Exit Sub
ErrorHandler:
    Call UI.ShowError("lbsHelper.setActionpad")
End Sub


'=============================================
' Set actionpad url with params
'=============================================
Public Sub setActionpad(ByRef oInspector As Lime.Inspector, Optional bIsIndex As Boolean = False)
On Error GoTo ErrorHandler

    Dim sUrl As String
    Dim lVisible As Long
    Dim sClass As String
    Dim lId As Long
    Dim bShouldHaveActionpad As Boolean
    Dim oParamsDic As New Scripting.Dictionary
    Dim oDicKey As Variant
    
    'not valid, run for it
    If (oInspector Is Nothing And bIsIndex = False) Then
        Exit Sub
    End If
    
    'set some environment and init values
    sClass = IIf(bIsIndex, "index", oInspector.Class.Name)
    lId = IIf(bIsIndex, "-1", oInspector.Record.id)
    bShouldHaveActionpad = (lbsHelper.getAvaliableActionpads.Exists(sClass) Or bIsIndex)
    lVisible = IIf(bShouldHaveActionpad, 1, 0)
    sUrl = ""
    
    'should have actionpad, find params
    If bShouldHaveActionpad Then
        
        'params
        Call oParamsDic.Add("ap", sClass)
        Call oParamsDic.Add("id", lId)
        Call oParamsDic.Add("server", ThisApplication.Database.ActiveServerName)
        Call oParamsDic.Add("db", ThisApplication.DatabaseName)
        
        'add params to url string
        sUrl = ThisApplication.WebFolder + "lbs.html?v=1"
        For Each oDicKey In oParamsDic
            sUrl = sUrl + "&&" + oDicKey + "=" + lbsHelper.URLEncode(CStr(oParamsDic(oDicKey)))
        Next oDicKey
        
    End If

    'set the actionpad
    If bIsIndex Then
        'index gets special treetment as it is not reloaded frequently and handle is avalible
        ThisApplication.WebBar.url = sUrl
    Else
        'normal inspector AP
        oInspector.WebBar.url = sUrl
        oInspector.WebBar.Visible = lVisible
    End If
    
    'Debug.Print (sUrl)

Exit Sub
ErrorHandler:
    Call UI.ShowError("lbsHelper.setActionpad")
End Sub

'=============================================
' Collects all avalible actionpad views in a dictionary
'=============================================
Public Function getAvaliableActionpads() As Scripting.Dictionary
On Error GoTo ErrorHandler
    
    Dim sFileName As String
    Dim sClassName As String
    Dim oFiles As New Scripting.Dictionary
    
    If (locAvalibleActionpads Is Nothing) Then
    
        sFileName = Dir(ThisApplication.WebFolder + "\*.html")
        Do While Len(sFileName) > 0
            sClassName = VBA.Left(sFileName, VBA.Len(sFileName) - 5)
            'dont add the aplication entrypoint
            If sClassName <> "lbs" Then
                Call oFiles.Add(sClassName, sClassName)
            End If
            sFileName = Dir
        Loop
        
        Set locAvalibleActionpads = oFiles
    End If
        
    Set getAvaliableActionpads = locAvalibleActionpads
    
Exit Function
ErrorHandler:
    Call UI.ShowError("lbsHelper.getAvaliableActionpads")
End Function

'=============================================
' Load file as if from webserver
'=============================================
Public Function loadHTTPResource(FilePath As String) As String
    On Error GoTo ErrorHandler
    Dim oXHTTP As Object
    Dim s As String
    Set oXHTTP = CreateObject("MSXML2.XMLHTTP")
    oXHTTP.Open "GET", WebFolder + FilePath, False
    oXHTTP.Send
    loadHTTPResource = oXHTTP.responseText
Exit Function
ErrorHandler:
    loadHTTPResource = ""
End Function

'=============================================
' Load Xml from storedProcedure
'=============================================
Public Function loadXmlFromStoredProcedure(procedureName As String) As String
    On Error GoTo ErrorHandler
    Dim sXml As String
    Dim oProcedure As LDE.Procedure
    Set oProcedure = Application.Database.Procedures.Lookup(procedureName, lkLookupProcedureByName)
    oProcedure.Parameters("@@lang").InputValue = Database.Locale
    oProcedure.Parameters("@@idcoworker").InputValue = ActiveUser.Record.id
    Call oProcedure.Execute(False)
    sXml = oProcedure.Result
    loadXmlFromStoredProcedure = sXml
Exit Function
ErrorHandler:
    loadXmlFromStoredProcedure = ""
End Function

'=============================================
' Load related record
'=============================================
Public Function loadRelatedRecord(sClass As String, lId As Long) As LDE.Record
    On Error GoTo ErrorHandler
    
    Dim oRecord As New LDE.Record
    Call oRecord.Open(Database.Classes(sClass), lId)
    Set loadRelatedRecord = oRecord
    
Exit Function
ErrorHandler:
    Set loadRelatedRecord = Nothing
End Function


'=============================================
' URL encode
'=============================================
Public Function URLEncode(StringVal As String, Optional SpaceAsPlus As Boolean = False) As String

  Dim StringLen As Long: StringLen = Len(StringVal)

  If StringLen > 0 Then
    ReDim Result(StringLen) As String
    Dim i As Long, CharCode As Integer
    Dim Char As String, Space As String

    If SpaceAsPlus Then Space = "+" Else Space = "%20"

    For i = 1 To StringLen
      Char = Mid$(StringVal, i, 1)
      CharCode = Asc(Char)
      Select Case CharCode
        Case 97 To 122, 65 To 90, 48 To 57, 45, 46, 95, 126
          Result(i) = Char
        Case 32
          Result(i) = Space
        Case 0 To 15
          Result(i) = "%0" & Hex(CharCode)
        Case Else
          Result(i) = "%" & Hex(CharCode)
      End Select
    Next i
    URLEncode = Join(Result, "")
  End If
End Function

