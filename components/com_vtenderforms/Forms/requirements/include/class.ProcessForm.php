<?php
	defined('_JEXEC') or die;
	
	class ProcessForm
	{
		
		var $formId;
		var $formArray;
		var $formLang;
		var $tempVar;
		var $tempKey;
		var $valueCost = Array();
		
		function ProcessForm($post)
		{
			$this->formId = $post["nameForm"];
			$this->formLang = $post["langForm"];
			$this->ProcessFormArray($post);
		}
		
		function startsWith($haystack, $needle)
		{
			$length = strlen($needle);
			
			if(substr($haystack, 0, $length) === $needle)
				return true;
			else
				return false;			
		}

		
		function ProcessFormArray($post)
		{
			// create array with form data to generate XML
			$post = array_filter($post, 'strlen');		
			foreach($post as $key=>$value)
			{				
				if($this->startsWith($key, $this->formId) == true)
				{					
					if($value == "#")
						$value = "";
				
				if(strstr($key,"VALUE_COST"))
					{
					 	$this->tempVar = $value;
						$this->tempKey = $key;
						$this->valueCost[$key] = $value;
					}	
					else
					if(strstr($key,"COSTS_RANGE_AND_CURRENCY"))
					{
					// echo "Sunt aici \n";	
						
						$this->formArray[$key] = $value;
						// $keys = $this->getTempKeys();
						// if(isset($keys) && isset($this->tempVar))
						// {
							// $this->formArray[$keys] = $this->tempVar;
						// }
						$valCost = $this->getTempValueCost();
					
						if(count($valCost) > 0 )
						{
							
							foreach($valCost as $keyC=>$valC)
							{
								$this->formArray[$keyC] = $valC;
							}
						}
						
						
					}
					else
					{
						$this->formArray[$key] = $value;
					}
					
						
				}												
			}	

			//-------------------------------set CTYPE -------------------------------------------------------------------
			
			foreach($this->formArray as $key=>$value){
				/*echo $key;
				echo "<br/>";
				echo "<br/>";*/
				if(strpos(strtoupper($key), "TYPE_CONTRACT")!==false){
					$_SESSION['CTYPE'] = $value;					
					//unset($this->formArray[$key]);
				}elseif(strpos(strtoupper($key), "F1#IIB2112#SUPPLIES")!==false){
					$_SESSION['CTYPE'] = $value;
				}
				
			}
			//------------------------------------------------------------------------------------------------------------			
		}
		
		function getFormArray()
		{
			return $this->formArray;
		}
		function getFormId()
		{
			return $this->formId;
		}	
		function getFormLang()
		{
			return $this->formLang;
		}
		function getTempKeys()
		{
			return $this->tempKey;
		}
		function getTempValueCost()
		{
			return $this->valueCost;
		}
	
	}
?>