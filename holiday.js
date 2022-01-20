var xmlDoc
var xmlFile = './holiday.xml'

//function to load xml doc
function loadXML()
{
    var xmlReq = new XMLHttpRequest;
    xmlReq.onreadystatechange = function()
    {
        console.log(xmlReq.readyState)
        if((xmlReq.readyState == 4) && (xmlReq.status == 200))
        {
            //xml doc successfully retrieved
            xmlDoc = xmlReq.responseXML
            displayTable()
        }
    }
    xmlReq.open('GET', xmlFile, true)
    xmlReq.send()
}

//function to display html table from xml data
function displayTable()
{
    var i;
    var table = "<tr><th>ID</th> <th>NAME</th> <th>ADDRESS</th> <th>PHONE</th> <th>EMAIL</th> </tr>"

    var x = xmlDoc.getElementsByTagName("User")
    for (i = 0; i < x.length; i++)
    {
        table += "<tr><td>" +
            x[i].getElementsByTagName("u_id")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("u_name")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("u_address")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("u_contact")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("u_email")[0].childNodes[0].nodeValue + "</td><td>" +
            "<td><span class='material-icons' onclick='deleteRecord(" +i+ ")'>delete</span></td></tr>"
    }
    document.getElementById("table").innerHTML = table
}

//function to delete record from XML
function deleteRecord(i)
{
    y = xmlDoc.getElementsByTagName("User")[i]
    var name = y.getElementsByTagName("u_name")[0].childNodes[0].nodeValue
    var reply = confirm("Do you want to delete record? \nName: " + name)
    if(reply == true)
    {
        xmlDoc.documentElement.removeChild(y)
        console.log("Record deleted: " + name)
        displayTable()
    }
}

//function to open form to add new record to xml
function openForm()
{
    document.getElementById("addRecordForm").style.display = "block"
}

//function to close form to add new record to xml
function closeForm()
{
    document.getElementById("addRecordForm").style.display = "none"
}


//function to add new record to xml
function addNewRecord()
{
    var i
    var user = []
    var x = document.getElementById("addRecordForm")
    user = xmlDoc.createElement("User")
    user[0] = xmlDoc.createElement("u_id")
    user[1] = xmlDoc.createElement("u_name")
    user[2] = xmlDoc.createElement("u_address")
    user[3] = xmlDoc.createElement("u_contact")
    user[4] = xmlDoc.createElement("u_email")
    for(i = 0; i < 5; i++)
    {
        user[i].appendChild(xmlDoc.createTextNode(x.elements[i].value))
        user.appendChild(user[i])
    }
    xmlDoc.documentElement.appendChild(user);
    console.log("Record added: " + x.elements[0].value)
    displayTable()
}