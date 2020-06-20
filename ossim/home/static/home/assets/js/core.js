
// if the user not logged in
//if(localStorage.getItem('isLogedin') == '1') location.replace('Login.html');


	var f ;
	var sessionId ;
	var SID ;
	var txt , audio , video ;
$(function(){
	f = new fileSystem ;
	f.commit();
	txt = 'txt';
	audio = 'audio';
	video = 'video';

	// Prevent Right Click

	document.addEventListener('contextmenu', event => event.preventDefault());
});


// autofocus the text field of modal 

$('.modal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});


// reset calculator on opening

function clearCalc (){
	$('#answer').val('0');
	$('#expressionArea').val('0');
}

// if the user Logged Out


function logOut(){
	localStorage.setItem('isLogedin' , '0') ;
	//location.replace('Login.html');
}


// Redirect to the Synchronization Example


function navigateTo(){
	location.replace('Task.html');
}


// Updating Path to show in  Navigation bar

function updatePath()
{
	var path = f.getCWDpath(sessionId);
	$('#directory').html(path);
}

// For going home ( root s)

function goHome(){
	var result = f.goToRoot(sessionId);
	displayContent(result);
	updatePath();

}	

// for going back

function goBack(){
	if(f.getCWDpath(sessionId) == '/root')return;
	var result = f.goBack(sessionId);
	displayContent(result);
	updatePath();
}


// display the content of the current Folder

function displayContent(result){
//	console.log(result);
	$('#content').empty();
	var html='' ;
//	console.log(result);
	for(i in result) {
		var value = result[i];
		if(value.type == 'dir'){
			html = "<i class='fa fa-folder' onclick='event.stopPropagation();selection("+value.fileID+")' style='font-size:20px;' class='type-folders' id='"+value.fileID+"' ondblclick='openFolder("+value.fileID+")'><p>"+value.fileName+"</p> </i>";
			$('#content').append(html);
		} else {

			if(value.type == 'txt') {
				
				html = "<i class='fa fa-file-text-o' style='font-size:20px;' onclick='event.stopPropagation();selection("+value.fileID+")' ondblclick='openFile("+value.fileID+","+txt+")' class='type-files' id='"+value.fileID+"'><p>"+value.fileName+"</p> </i>";
				$('#content').append(html);

			} else if(value.type == 'audio'){
				
				html = "<i class='fa fa-file-music' style='font-size:20px;' onclick='event.stopPropagation();selection("+value.fileID+")' ondblclick='openFile("+value.fileID+","+audio+")' class='type-files' id='"+value.fileID+"'><p>"+value.fileName+"</p> </i>";
				$('#content').append(html);

			} else if(value.type == 'video') {
				
				html += "<i class='fa fa-file-video-camera' style='font-size:20px;' onclick='event.stopPropagation();selection("+value.fileID+")' ondblclick='openFile("+value.fileID+","+video+")' class='type-files' id='"+value.fileID+"'><p>"+value.fileName+"</p> </i>";
				$('#content').append(html);

			}
		}
	}

	$('#copy').slideUp();
	$('#cut').slideUp();
	$('#rename').slideUp();
	$('#delete').slideUp();

}

// on Clicking Folder Icon


$('#folder').click(function(){
	sessionId = f.createSession();
	$('#desktopContent').hide();
	displayContent(f.goToRoot(sessionId));
	$('#exploringContent').show();
	updatePath();
});


// On closing the File system , show the Desktop


function closeRoot() {
    //f.terminateSession(sessionId);
	//location.reload();
	$('#desktopContent').show();
	$('#exploringContent').hide();

}


// on changing the file type

function showHideLink(){ 
	var type = $('#file-type').val();
	if(type == 'txt') $('#showHideLink').hide();
	if(type == 'audio') $('#showHideLink').show();		
	if(type == 'video') $('#showHideLink').show();
}


// Enter can save changes 

$('.create-file').keypress(function(e){
	if(e.which == 13) {
		creatingFile() ;
	}
});


// Creating file


function creatingFile() {
	var fileId , html ;
	if($('#file-name').val() == '' )return ;
	if($('#file-type').val() == 'txt'){
		fileId = f.newFile(sessionId, $('#file-name').val() , $('#file-type').val() , '');
		if(fileId == null)return;
		fileId = fileId.fileID;

		
		html = "<i class='fa fa-file-text-o' style='font-size:20px;' onclick='event.stopPropagation();selection("+fileId+")' class='type-files' ondblclick='openFile("+fileId+","+txt+")' id='"+fileId+"'><p>"+$('#file-name').val()+"</p> </i>";
	}
	else if($('#file-type').val() == 'audio'){
		fileId = f.newFile(sessionId, $('#file-name').val() , $('#file-type').val() , $('#file-link').val());
		
		fileId = fileId.fileID;	
		

		html = "<i class='fa fa-music' style='font-size:20px;' onclick='event.stopPropagation();selection("+fileId+")' class='type-files' ondblclick='openFile("+fileId+","+audio+")' id='"+fileId+"'><p>"+$('#file-name').val()+"</p> </i>";
	}
	else if($('#file-type').val() == 'video'){
		fileId = f.newFile(sessionId, $('#file-name').val() , $('#file-type').val() , $('#file-link').val());
		
		fileId = fileId.fileID;	
		

		html = "<i class='fa fa-video-camera' style='font-size:20px;' onclick='event.stopPropagation();selection("+fileId+")' class='type-files' ondblclick='openFile("+fileId+","+video+")' id='"+fileId+"'><p>"+$('#file-name').val()+"</p> </i>";
	} else {
		return ;
	}
	


	$('#content').append(html);
	$('#file-name').val('');
	$('#file-type').val('txt');
	$('#file-link').val('');
	showHideLink();
	$('.newFile').hide();
	$('.newFile').modal('hide');

}

// Enter Can Save Changes

$('.create-folder').keypress(function(e){
	if(e.which == 13) {
		creatingFolder() ;
	}
});

// Creating Folder


function creatingFolder() {


	var folderId = f.newFolder(sessionId, $('#folder-name').val() );
	if(folderId == null)return;

	folderId = folderId.fileID;	
	var html = "<i class='fa fa-folder' style='font-size:20px;' class='type-folders' id='"+folderId+"' onclick='event.stopPropagation();selection("+folderId+")' ondblclick='openFolder("+folderId+")'><p>"+$('#folder-name').val()+"</p> </i>";
	$('#content').append(html);
	$('#folder-name').val('');
	$('.newFolder').hide();
	$('.newFolder').modal('hide');

}

// Opening Folder


function openFolder(folderId) {
	f.select(sessionId,folderId);
	var result = f.open(sessionId);
	displayContent(result);
	updatePath();
	
}

// Opening File


function openFile(fileID , fileType){
	f.select(sessionId,fileID);
	var result = f.open(sessionId);
	var html ;

	if(fileType != 'txt'){
		$('modalSave').remove();
	}

	if(fileType == 'txt') {
		html = "<textarea style='width: 728px; height: 438px; margin: 0px; resize: none; max-width: 100%;' id='editFileContent'>"+result+"</textarea>";
		$('#modalBody').empty();
		$('#modalBody').append(html);
		$('#modalTitle').empty();
		$('#modalTitle').append('Edit File');
		$('#openApps').click();
		if(	$('#textEditor').hasClass('audioSettings')) $('#textEditor').removeClass('audioSettings');

	}

	// Link from youtube , ex : www.youtube.com/watch?v="AnyThing" , The Field take Only the "AnyThing" Text

	if(fileType == 'video'){

		html = "<object width='728' height='438' data='https://www.youtube.com/embed/"+result+"'> </object>";


		$('#modalBody').empty();
		$('#modalTitle').empty();

		$('#modalBody').append(html);
		$('#openApps').click();
		if(	$('#textEditor').hasClass('audioSettings')) $('#textEditor').removeClass('audioSettings');

	} 

	// Link  from Your Desktop

	if(fileType=='audio'){
		html = "<audio controls> <source src='"+result+"'></audio>";
		$('#modalBody').empty();
		$('#modalTitle').empty();
		$('#textEditor').addClass('audioSettings');
		$('#modalBody').append(html);
		$('#openApps').click();
	}
	


}

// reset the body which apps (audio - video ) are appeared in


function closeApps() {
	$('#modalBody').empty();
}

function saveChanges(){

	f.save(sessionId, $('#editFileContent').val());

}

// Mark the file or Folder as selection On click


function selection(id) {
	

	if(id=='content')
	{
		$('#'+SID).removeClass("selected");
		SID=null;
		f.unselect(sessionId);
			$('#copy').slideUp();
			$('#cut').slideUp();
			$('#rename').slideUp();
			$('#delete').slideUp();
	}
	else {
		if(SID== null)
		{
			SID=id;
			$('#'+SID).addClass("selected");
			$('#copy').slideDown();
			$('#cut').slideDown();
			$('#rename').slideDown();
			$('#delete').slideDown();
		}
		else
		{
			$('#'+SID).removeClass("selected");
			SID=id;
			$('#'+SID).addClass("selected");
			$('#copy').slideDown();
			$('#cut').slideDown();
			$('#rename').slideDown();
			$('#delete').slideDown();
		}
		f.select(sessionId,id);

		//$('#operation').slideDown();

	}
}

// Enter Can Save Changes


$('#file-rename').keypress(function(e){
	if(e.which == 13) {
		renamingFile() ;
	}
});

// Renaming File


function renamingFile() {

	f.rename(sessionId, $('#file-rename').val() );
	$('#'+SID).empty();
	$('#'+SID).html("<p>"+$('#file-rename').val()+"</p>");
	
	$('#file-rename').val('');
	$('.rename').hide();
	$('.rename').modal('hide');

	
}

// Copying


function onCopy(){
	f.copy(sessionId);
	$('#paste').slideDown();

}

// Cutting

function onCut(){
	f.cut(sessionId);

	$('#paste').slideDown();
}

// Pasting


function onPaste(){

	var result = f.paste(sessionId);
	if(result== null) return ;	

	if(result.type == 'dir'){
			html = "<i class='fa fa-folder' style='font-size:20px;' onclick='event.stopPropagation();selection("+result.fileID+")' class='type-folders' id='"+result.fileID+"' ondblclick='openFolder("+result.fileID+")'><p>"+result.fileName+"</p> </i>";
			$('#content').append(html);
		} else {

			if(result.type == 'txt') {

				html = "<i class='fa fa-file-text-o' style='font-size:20px;' onclick='event.stopPropagation();selection("+result.fileID+")' ondblclick='openFile("+result.fileID+","+txt+")' class='type-files' id='"+result.fileID+"'><p>"+result.fileName+"</p> </i>";
				$('#content').append(html);

			} else if(result.type == 'audio'){
				
				html = "<i class='fa fa-file-music' style='font-size:20px;' onclick='event.stopPropagation();selection("+result.fileID+")' ondblclick='openFile("+result.fileID+","+audio+")' class='type-files' id='"+result.fileID+"'><p>"+result.fileName+"</p> </i>";
				$('#content').append(html);

			} else if(result.type == 'video') {
				
				html += "<i class='fa fa-file-video-camera' style='font-size:20px;' onclick='event.stopPropagation();selection("+result.fileID+")' ondblclick='openFile("+result.fileID+","+video+")'  class='type-files' id='"+result.fileID+"'><p>"+result.fileName+"</p> </i>";
				$('#content').append(html);
			}
		}

	$('#paste').slideUp();


}

// Deleting


function deleteAny(){
	f.deleteFile(sessionId);
	$('#'+SID).remove();

}

