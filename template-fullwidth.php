<?php
/**
 * Template Name: Full-width Page
 *
 * Description: A custom page template for displaying a fullwidth page with no sidebar.
 *
 * @package Merlin
 */

get_header(); ?>

	<section id="primary" class="fullwidth-content-area content-area">
		<main id="main" class="site-main" role="main">
		
			<?php if ( function_exists( 'themezee_breadcrumbs' ) ) themezee_breadcrumbs(); ?>
			

			<?php while (have_posts()) : the_post();

				get_template_part( 'template-parts/content', 'page' );
				
				comments_template();

			endwhile; ?>
		
		</main><!-- #main -->
	</section><!-- #primary -->

<?php get_footer(); ?>