$(function(){
	$.ajax({
		method:'GET',
		url:'api/videos',
		success:function(videos){
			$.each(videos,function(i,video){
				$("#videolist").append('<li>'+video.title+'</li>');
			});
		},
		error:function(){
			alert("Error loading videos");
		}
});

	$('#add').click(function(){
		var vtitle=$('#title').val();
		var vgenre=$('#genre').val();
		var vdesc=$('#description').val();

		var video = {
			title: vtitle,
			genre: vgenre,
			description: vdesc
		}

		$.ajax({
		method:'POST',
		url:'api/videos',
		data: video,
		success:function(newVideo){
			// $("#videolist").append('<li><img src="../images/'+video._id+'.jpg">'+newVideo.title+'</li>');
			$("#videolist").append('<li>'+newVideo.title+'</li>');
			
		},
		error:function(){
			alert("Error loading videos");
		}
		});
	});

	


});


	