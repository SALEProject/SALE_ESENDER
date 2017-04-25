<?php
	defined('_JEXEC') or die;
	
	class BreadCrumb{
		var $app;
		var $pathway;
		
		function BreadCrumb($name, $link){
			$this->app = JFactory::getApplication();
			$this->pathway = $this->app->getPathway();
			$this->pathway->addItem($name, $link);
		}
	}
?>