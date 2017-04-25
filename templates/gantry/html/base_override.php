<?php
/**
 * @version   $Id: base_override.php 4060 2012-10-02 18:03:24Z btowles $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */
defined('_JEXEC') or die;

$ro_app              = JFactory::getApplication();
$ro_current_template = $ro_app->getTemplate(true);
$ro_search_paths     = array();
$ro_jversion         = new JVersion();
$ro_backtrace        = debug_backtrace();
$ro_called_path      = $path = preg_replace('#[/\\\\]+#', '/', $ro_backtrace[0]['file']);
$ro_called_array     = explode('/', $ro_called_path);

$ro_template  = array_pop($ro_called_array);
$ro_view      = array_pop($ro_called_array);
$ro_extension = array_pop($ro_called_array);

$ro_relative_template_override_path = $ro_view . '/' . $ro_template;
if ($ro_extension != 'html') {
	$ro_relative_template_override_path = $ro_extension . '/' . $ro_relative_template_override_path;
}

JLog::add(sprintf('Running RokOverride for template file %s.', $ro_backtrace[0]['file']), JLog::DEBUG, 'rokoverrides');

// add custom version paths
$ro_search_paths[] = implode('/', array(
                                       dirname(__FILE__),
                                       'joomla',
                                       $ro_jversion->getShortVersion(),
                                       $ro_relative_template_override_path
                                  ));
$ro_search_paths[] = implode('/', array(
                                       dirname(__FILE__),
                                       'joomla',
                                       $ro_jversion->RELEASE,
                                       $ro_relative_template_override_path
                                  ));

JLog::add(sprintf('Override search path is %s', implode(',', $ro_search_paths)), JLog::DEBUG, 'rokoverrides');
// cycle through the search path and use the first thats there
foreach ($ro_search_paths as $ro_search_path) {
	if (is_file($ro_search_path)) {
		JLog::add(sprintf('Found override file %s.', $ro_search_path), JLog::DEBUG, 'rokoverrides');
		ob_start();
		include $ro_search_path;
		$ro_output = ob_get_clean();
		echo $ro_output;
		return;
	}
}

// fallback case to route back to default overrides
if (isset($this) && isset($filetofind)) {
	// Fallback for components
	array_shift($this->_path['template']);
	$ro_current_layout = $this->getLayout();
	$ro_current_tpl    = preg_replace('/^' . $ro_current_layout . '_/', '', pathinfo($filetofind, PATHINFO_FILENAME));
	if ($ro_current_tpl == pathinfo($filetofind, PATHINFO_FILENAME)) $ro_current_tpl = null;
	echo $this->loadTemplate($ro_current_tpl);
	return;
} elseif (isset($module) && isset($path) && isset($attribs)) {
	// Build the base path for the layout
	$ro_bPath = JPATH_BASE . '/modules/' . $module->module . '/tmpl/' . basename($ro_backtrace[0]['file']);
	$ro_dPath = JPATH_BASE . '/modules/' . $module->module . '/tmpl/default.php';

	if (file_exists($ro_bPath)) {
		require $ro_bPath;
		return;
	} elseif (file_exists($ro_dPath)) {
		require $ro_dPath;
		return;
	}
}
JLog::add(sprintf('Unable to find fallback override to roll back to for call to %s', $ro_backtrace[0]['file']), JLog::ERROR, 'rokoverrides');
throw new Exception(JText::sprintf('PLG_SYSTEM_ROKOVERRIDES_ERROR_UNABLE_TO_FIND_FALLBACK_OVERRIDE', $ro_backtrace[0]['file']));